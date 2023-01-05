const abi = [
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "bytes32", name: "leaf", type: "bytes32" },
        { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
      ],
      name: "BadProof",
      type: "error",
    },
    {
      inputs: [{ internalType: "uint256", name: "treeIndex", type: "uint256" }],
      name: "BadTreeIndex",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "bytes32", name: "leafHash", type: "bytes32" },
      ],
      name: "LeafAlreadyClaimed",
      type: "error",
    },
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "bytes32", name: "leaf", type: "bytes32" },
      ],
      name: "TokensNotTransferred",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "treeIndex",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "newRoot",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "ipfsHash",
          type: "bytes32",
        },
      ],
      name: "MerkleTreeAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "treeIndex",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TokensDeposited",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "treeIndex",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "destination",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "WithdrawalOccurred",
      type: "event",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "newRoot", type: "bytes32" },
        { internalType: "bytes32", name: "ipfsHash", type: "bytes32" },
        { internalType: "address", name: "tokenAddress", type: "address" },
        { internalType: "uint256", name: "tokenBalance", type: "uint256" },
      ],
      name: "addMerkleTree",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "depositTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "bytes32", name: "leaf", type: "bytes32" },
      ],
      name: "getWithdrawn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "merkleTrees",
      outputs: [
        { internalType: "bytes32", name: "merkleRoot", type: "bytes32" },
        { internalType: "bytes32", name: "ipfsHash", type: "bytes32" },
        { internalType: "address", name: "tokenAddress", type: "address" },
        { internalType: "uint256", name: "tokenBalance", type: "uint256" },
        { internalType: "uint256", name: "spentTokens", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "numTrees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "treeIndex", type: "uint256" },
        { internalType: "address", name: "destination", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  
 export function getAddress(chainID) {
    let address = ''
    switch(chainID) {
      case 1:
        address = "0xabb8CA4F42A68A13484524812A0B141db315E671"
        break;
      case 5:
        address = "0xe18898Db95f7B803CF707f3AAAe2ecA14857c916"
        break;
      case 137:
        address= "0xDb012c51D3451bda3502f75D80540C615D71dE70"
        break;
    }
    return address
  }
  // const address = "0xe18898Db95f7B803CF707f3AAAe2ecA14857c916";
  
  export { abi };
  