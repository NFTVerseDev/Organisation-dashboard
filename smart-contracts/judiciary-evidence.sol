// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 

contract NFTToken is ERC721 {

    struct judiciary { 
    uint FIRid;
    uint NFTid ;
    string evidencetakenby ;
    string evedencetype;
    string reportofforiensic;
    string investigationagency;
    string reportofjudge;
}
    uint[] FIRIdList;

    mapping(uint => judiciary)judiciaryMap;


    string public nameNFT;
    string public nameSymbol;
    string public nftTokenURI;
    uint256 public nftId;  // default  : 0 

    //Keep the record of  nfts
    mapping(uint256 => string) public tokenURIExists;
    
    
    //Keep the record for nfts value => give id returns cost 
    mapping(uint256 => uint256) public tokenIdToValue;
    
    event NFTMint( uint tokenId , address _owner , string _URL ) ;
    
    // Base URI
    string  _baseURIextended;
    
    constructor () ERC721("Crime Investigation NFT collection", "NFT") {
   
    
    }
    
    modifier checkFIRExist(uint _FIRid){
       require (judiciaryMap[_FIRid].FIRid == _FIRid)  ;
       _;
    }

    modifier checkFIRNOTExist(uint _FIRid){
       require (judiciaryMap[_FIRid].FIRid != _FIRid)  ;
       _;
    }
    
    
    function setBaseURI(string memory baseURI_) external  {
        _baseURIextended = baseURI_;
    }
    
    
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require( _exists(tokenId),"ERC721Metadata: URI set of nonexistent token");
        tokenURIExists[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

            string memory _tokenURI = tokenURIExists[tokenId];
            string memory base = _baseURI();
            
            // If there is no base URI, return the token URI.
            if (bytes(base).length == 0) {
                return _tokenURI;
            }
            // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
            if (bytes(_tokenURI).length > 0) {
                return string(abi.encodePacked(base, _tokenURI));
            }
            // // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
            // return string(abi.encodePacked(base, tokenId.toString()));
            return string(abi.encodePacked(base, tokenId));
    }
        
  
    function Mint (string memory _tokenURI , uint _FIRid , string memory _evidencetakenby , string memory _evedencetype ) public checkFIRNOTExist(_FIRid) returns (uint256)  {
        require(msg.sender != address(0));
        nftTokenURI = _tokenURI;
        // used as token id 
        nftId ++;
        // check if a token exists with the above token id => incremented counter
        require(!_exists(nftId));
       // tokenIdToValue[nftId] = _nftPrice;
        _mint(msg.sender,nftId);
        _setTokenURI(nftId, nftTokenURI);

        judiciaryMap[_FIRid].FIRid = _FIRid ;
        judiciaryMap[_FIRid].NFTid = nftId ;
        judiciaryMap[_FIRid].evidencetakenby =  _evidencetakenby; 
        judiciaryMap[_FIRid].evedencetype = _evedencetype ;

        FIRIdList.push(_FIRid) ;
        
        emit NFTMint (nftId , msg.sender , _tokenURI )  ; // comment 
        return nftId;
        
    }
    
    function tokenExists (uint256 _tokenID) external view returns (bool) {
        require(!_exists(nftId));
        return true ; 
    } 

    

    function getJudiciary(uint _id) view public returns(uint,uint,string memory,string memory,string memory,string memory) {
        
    return (judiciaryMap[_id].FIRid,
            judiciaryMap[_id].NFTid,
            judiciaryMap[_id].evidencetakenby,
            judiciaryMap[_id].reportofforiensic,
            judiciaryMap[_id].investigationagency ,
            judiciaryMap[_id].reportofjudge 
            );  
    }

    function ForiensiesReport(uint _tokenId ,  uint _id,string memory _report)  public checkFIRExist(_id) {
    
        require(ownerOf(_tokenId) == msg.sender);    
        judiciaryMap[_id].reportofforiensic = _report;
                
        }


        function Investigationagency(uint _tokenId, uint _id , string memory _report) public checkFIRExist(_id) {
            require(ownerOf(_tokenId) == msg.sender);
           judiciaryMap[_id].investigationagency = _report;
            
        }

        
        function judgeReport( uint _tokenid , uint _id,string memory _report) public  checkFIRExist(_id) {
            require(ownerOf(_tokenid) == msg.sender);
            judiciaryMap[_id].reportofjudge = _report;
            
        }

    function _transferFrom(  address _to , uint _tokenId ) public {

        require(ownerOf(_tokenId) == msg.sender);
        transferFrom(msg.sender,_to,_tokenId);
    }


    function getFIRList() view public returns (uint[] memory) {
        return FIRIdList ;
    }
    
}
