use anchor_lang::{
    prelude::*,
    solana_program::program::invoke,
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint as SplMint, MintTo, Token, TokenAccount as SplTokenAccount},
};
use mpl_token_metadata::{
    ID as TOKEN_METADATA_ID,
    instructions::{                    
    CreateMasterEditionV3Builder,
    CreateMetadataAccountV3Builder,
    },
    types::DataV2,
};
    
declare_id!("J9t8avxiq2SXBsrL6wVeFtSsqPSy5c2ww9XzBVAEEoKK");
    
#[program]
pub mod skill_certificate {
use super::*;
    
    /// Mints a soul-bound proof-of-skill NFT (supply locked to 1).  
pub fn minting(  
    ctx:   Context<MintCredential>,  
    name:  String,  
    symbol:String,  
    uri:   String,  
    ) -> Result<()> {  
    /* ───────── mint exactly one token to the user ───────── */  
    token::mint_to(ctx.accounts.mint_to_ctx(), 1)?;  

    /* ─────────  Metadata account (Metaplex) ───────── */  
    let data=DataV2{  
        name,  
        symbol,  
        uri,  
        seller_fee_basis_points:0,  
        creators: None,  
        collection:None,  
        uses: None,  
    };  
    let metadata_ix = CreateMetadataAccountV3Builder::new()          
        .metadata(ctx.accounts.metadata.key())                       
        .mint(ctx.accounts.mint.key())  
        .mint_authority(ctx.accounts.user.key())  
        .payer(ctx.accounts.user.key())  
        .update_authority(ctx.accounts.user.key(), true)  
        .data(data)                                  
        .is_mutable(true)  
        .instruction();                                              

    // prepare a reusable AccountInfo for the user
    let user_ai = ctx.accounts.user.to_account_info();

    // 2) Metadata CPI: include the metadata program ID + 3 user clones
    invoke(
        &metadata_ix,
        &[
            ctx.accounts.token_metadata_program.to_account_info(), // ← Metaplex program
            ctx.accounts.metadata.to_account_info(),               // metadata PDA
            ctx.accounts.mint.to_account_info(),                   // mint
            user_ai.clone(),                                       // mint_authority
            user_ai.clone(),                                       // payer
            user_ai.clone(),                                       // update_authority
            ctx.accounts.system_program.to_account_info(),         // system
            ctx.accounts.rent.to_account_info(),                   // rent
        ],
    )?;  // Missing any of these exactly as ordered will throw “missing account” :contentReference[oaicite:0]{index=0}

    /* ───────── Master-Edition (locks supply at 1) ───────── */  
    let me_ix = CreateMasterEditionV3Builder::new()  
        .edition(ctx.accounts.master_edition.key())                  
        .mint(ctx.accounts.mint.key())  
        .payer(ctx.accounts.user.key())  
        .mint_authority(ctx.accounts.user.key())  
        .update_authority(ctx.accounts.user.key())  
        .metadata(ctx.accounts.metadata.key())  
        .max_supply(0)                                               
        .instruction();  
    
    // 3) Master Edition CPI: again include the metadata program + user clones
    invoke(
        &me_ix,
        &[
            ctx.accounts.token_metadata_program.to_account_info(), // Metaplex program
            ctx.accounts.master_edition.to_account_info(),         // edition PDA
            ctx.accounts.mint.to_account_info(),                   // mint
            user_ai.clone(),                                       // payer
            user_ai.clone(),                                       // mint_authority
            user_ai.clone(),                                       // update_authority
            ctx.accounts.metadata.to_account_info(),               // metadata PDA
            ctx.accounts.system_program.to_account_info(),         // system
            ctx.accounts.rent.to_account_info(),                   // rent
        ],
    )?;
    
    msg!("✅  Skill-certificate NFT minted & supply locked");  
    Ok(())  
    }
    
}
    
/* -------------------------------------------------------------------------- /
/                                   ACCOUNTS                                 /
/ -------------------------------------------------------------------------- */
#[derive(Accounts)]
pub struct MintCredential<'info> {
    /// Mint authority / fee payer
    #[account(mut)]
    pub user: Signer<'info>,

    /// Fresh mint – 0 decimals, user controls it  
    #[account(  
        init,  
        payer = user,  
        mint::decimals         = 0,  
        mint::authority        = user,  
        mint::freeze_authority = user  
    )]  
    pub mint: Account<'info, SplMint>,  

    /// User’s Associated Token Account for the NFT  
    #[account(  
        init,  
        payer               = user,  
        associated_token::mint      = mint,  
        associated_token::authority = user,  
    )]  
    pub token_account: Account<'info, SplTokenAccount>,  

    /// CHECK: this is the Metaplex Token Metadata program id
    #[account(address = TOKEN_METADATA_ID)]
    pub token_metadata_program: UncheckedAccount<'info>,


    /* Metaplex PDAs – will be created by CPI, hence `mut` & unchecked */  
    /// CHECK: address is verified by the Metaplex program  
    #[account(mut)]  
    pub metadata: UncheckedAccount<'info>,  


    /// CHECK: address is verified by the Metaplex program  
    #[account(mut)]  
    pub master_edition: UncheckedAccount<'info>,  

    /* Programs & sysvars */  
    pub token_program:            Program<'info, Token>,  
    pub system_program:           Program<'info, System>,  
    pub rent:                     Sysvar<'info, Rent>,  
    pub associated_token_program: Program<'info, AssociatedToken>,

}
    
impl<'info> MintCredential<'info> {
    /// Anchor helper so token::mint_to knows who is signing.
    pub fn mint_to_ctx(&self) -> CpiContext<'_,'_,'_, 'info, MintTo<'info>> {
    CpiContext::new(
    self.token_program.to_account_info(),
    MintTo {
        mint:      self.mint.to_account_info(),
        to:        self.token_account.to_account_info(),
        authority: self.user.to_account_info(),
        },
        )   
    }
}