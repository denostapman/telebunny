import type { UniqueGift } from './gift.ts';
import type { AreaPosition } from './story.ts';

/** This object describes a TON wallet card, which is shown on the profile page of a user to everyone. */
export interface TonWalletCard {
	/** Address of the wallet */
	address: string;
	/** Balance of the wallet, in the smallest units of the cryptocurrency, as a decimal number */
	amount: string;
	/** Stickers placed on the card */
	stickers: TonWalletCardSticker[];
	/** Address of the NFT of one of the stickers, whose colors must be used for the card background; omitted if the default background must be used */
	backgroundNftAddress?: string;
}

/** This object describes a sticker on a TON wallet card. */
export interface TonWalletCardSticker {
	/** Position of the sticker on the card */
	position: AreaPosition;
	/** The NFT shown as the sticker */
	nft: TonNft;
}

/** This object represents an NFT in the TON blockchain. */
export interface TonNft {
	/** Address of the NFT */
	address: string;
	/** Address of the collection to which the NFT belongs; omitted if unknown */
	collectionAddress?: string;
	/** Index of the NFT among all NFTs from the collection as a decimal number */
	index: string;
	/** Name of the NFT */
	name: string;
	/** Description of the NFT */
	description: string;
	/** Attributes of the NFT */
	attributes?: TonNftAttribute[];
	/** The unique gift corresponding to the NFT */
	gift?: UniqueGift;
}

/** This object represents an attribute of an NFT in the TON blockchain. */
export interface TonNftAttribute {
	/** Trait type of the attribute */
	traitType: string;
	/** Value of the attribute */
	value: string;
}

/** Describes a service message about a transfer with a TON wallet. */
export interface TonWalletTransfer {
	/** Unique identifier of the transaction; may be empty if the transfer hasn't been sent yet */
	transactionId: string;
	/** Address of the transfer peer in the TON blockchain */
	peerAddress: string;
	/** The amount of transferred cryptocurrency, in the smallest units of the cryptocurrency, as a decimal number; negative for outgoing transfers */
	amount: string;
	/** Comment added to the transfer; omitted if the comment is encrypted */
	comment?: string;
}
