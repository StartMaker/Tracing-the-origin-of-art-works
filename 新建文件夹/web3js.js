if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://119.23.233.57:8083"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
// var abi = [
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_bidPrice",
//                 "type": "uint256"
//             }
//         ],
//         "name": "auction",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "setCommodityAgents",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_buyer",
//                 "type": "address"
//             },
//             {
//                 "name": "_priceNow",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer1",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_CommodityName",
//                 "type": "string"
//             }
//         ],
//         "name": "setCommodityOwnerHolderName",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "auctionEnd1",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "setCommodityCodeList",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "setCommodityElsePara",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_priceNow",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setCommodityDatePrice",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_CommodityName",
//                 "type": "string"
//             },
//             {
//                 "name": "_priceNow",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setCommodityCode",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "auctionEnd2",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_commodityName",
//                 "type": "string"
//             }
//         ],
//         "name": "getCommodityCode",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_buyer",
//                 "type": "address"
//             },
//             {
//                 "name": "_priceNow",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer2",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "queryCommodity2",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint256"
//             },
//             {
//                 "name": "",
//                 "type": "bool"
//             },
//             {
//                 "name": "",
//                 "type": "bool"
//             },
//             {
//                 "name": "",
//                 "type": "address[]"
//             },
//             {
//                 "name": "",
//                 "type": "bytes32[]"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_buyer",
//                 "type": "address"
//             },
//             {
//                 "name": "_priceNow",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer3",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "setCommodityTId",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "getCommodityCodeList",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bytes32[]"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "queryCommodity1",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "name": "",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "uint256"
//             },
//             {
//                 "name": "",
//                 "type": "uint256"
//             },
//             {
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_commodityCode",
//                 "type": "bytes32"
//             },
//             {
//                 "name": "_state",
//                 "type": "bool"
//             }
//         ],
//         "name": "changeCommodityState",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "setCommodityAgents",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_buyer",
                "type": "address"
            },
            {
                "name": "_priceNow",
                "type": "uint256"
            }
        ],
        "name": "transfer1",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "auctionEnd1",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "setCommodityCodeList",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "setCommodityElsePara",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_priceNow",
                "type": "uint256"
            }
        ],
        "name": "setCommodityDatePrice",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityName",
                "type": "string"
            },
            {
                "name": "_priceNow",
                "type": "uint256"
            }
        ],
        "name": "setCommodityCode",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "auctionEnd2",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_commodityName",
                "type": "string"
            }
        ],
        "name": "getCommodityCode",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_buyer",
                "type": "address"
            },
            {
                "name": "_priceNow",
                "type": "uint256"
            }
        ],
        "name": "transfer2",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "queryCommodity2",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_buyer",
                "type": "address"
            },
            {
                "name": "_priceNow",
                "type": "uint256"
            }
        ],
        "name": "transfer3",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "setCommodityTId",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCommodityCodeList",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            }
        ],
        "name": "queryCommodity1",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_bidPrice",
                "type": "uint256"
            }
        ],
        "name": "aution",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_commodityCode",
                "type": "bytes32"
            },
            {
                "name": "_state",
                "type": "bool"
            }
        ],
        "name": "changeCommodityState",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var infoContract = web3.eth.contract(abi);
var info = infoContract.at("0x011008652c4b11da6ed956996f03c4b49a00587f");
function start() {
    let promise = new Promise(function (resolve, reject) {
        let data = axios({
            url:"http://10.20.0.55:8084/product/unlock",
            method: "get",
            headers: {
                "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzM1NTcwMzksInVzZXJuYW1lIjoiMjI3MzE2OTQ2NEBxcS5jb20ifQ.o3Kt90r6E3ibTQ8LIkDWA_wbW8C0EB1lbBTIagAcnok"
            }
        });
        resolve(data);
    })
    promise.then(function (data) {
        console.log(data);
        info.setCommodityCode("nam","111");
        console.log(info.getCommodityCode("nam"));
    });
}
function start2() {
    let setdata = 0;
    let getdata = 0;
    do{
        if(setdata == 0) {
            setdata = info.setCommodityCode("rbab", "111");
            /*打印函数*/
            console.log(setdata);

        }
        getdata = info.getCommodityCode("rbab");
        /*打印函数*/
        console.log("wait"+getdata);
    }while(getdata==0);
    let CodeList = info.setCommodityCodeList(getdata);
    let setPrice = info.setCommodityDatePrice(getdata,1500);
    let queryCommodity1 = info.queryCommodity1(getdata);
    let queryCommodity2 = info.queryCommodity2(getdata);
    console.log("queryCommodity1=" + queryCommodity1);
    console.log("queryCommodity2=" + queryCommodity2);
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}