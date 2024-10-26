workspace "Name" "Description" {

    !identifiers hierarchical

    model {
        relicOwner = person "RelicOwner" {
            description "A user who owns relics"
        }
        relicBuyer = person "Relic Buyer" {
            description "A user who wants to buy a relic"
        }

        relicChain = softwaresystem "RelicChain" {
            description "Allows users to keep track of relics, authenticate or auction them."

            webApplication = container "Web Application" {
                description "A web-based front-end application for interacting with the blockchain."
                technology "React, JavaScript"

                connectAccountPage = component "ConnectAccountPage" {
                    description "Notifies users to connect their wallets to MetaMask"
                }

                inventoryModule = component "InventoryModule" {
                    description "Allows users to manage their relics"
                }

                browseModule = component "BrowseModule" {
                    description "Allows users to browse auctioned relics"
                }

                auctionModule = component "AuctionModule" {
                    description "Allows user to bid for a relic"
                }

                authenticationModule = component "AuthenticateModule" {
                    description "Allows user the pay for authentication services for a relic"
                }
            }

            smartContracts = container "SmartContracts" {
                description "Add functionality to the blockchain"
            }
        }

        blockchain = softwareSystem "Blockchain" {
            tag "Blockchain"
            description "A decentralized network where relic ownership and auction details are stored as NFTs." 
        }

        metaMask = softwaresystem "MetaMask" {
            description "Stores users' crypto wallets and facilitates blockchain transactions."
            tag "metaMask"
        }

        ipfs = softwareSystem "Ipfs" {
            tag "Ipfs"
            description "Stores data about relics"
        }

        relicOwner -> relicChain.webApplication "Manages relics using"
        relicBuyer -> relicChain.webApplication "Browses relics and participates in auctions via"
        relicChain -> blockchain "Makes calls to"
        metaMask -> blockchain "Signs and submits transactions to"
        
        relicOwner -> metaMask "Connects their wallet to"
        relicBuyer -> metaMask "Connects their wallet to"

            relicChain.smartContracts -> blockchain "Deployed on"
        relicChain.webApplication -> relicChain.smartContracts "Submits relic data and auction bids to"
        relicChain.webApplication -> metaMask "Connects to user's wallet via"
        relicChain.webApplication -> ipfs "Stores and retrieves data via"

        relicOwner -> relicChain.webApplication.inventoryModule "Manages owned relics using"
        relicOwner -> relicChain.webApplication.authenticationModule "Authenticates a relic using"
        relicBuyer -> relicChain.webApplication.browseModule "Views auctioned relics using"
        relicBuyer -> relicChain.webApplication.auctionModule "Bids for a relic using"

        relicChain.webApplication.inventoryModule -> relicChain.smartContracts "Makes calls to"
        relicChain.webApplication.authenticationModule -> relicChain.smartContracts "Makes calls to"
        relicChain.webApplication.browseModule -> relicChain.smartContracts "Makes calls to"
        relicChain.webApplication.auctionModule -> relicChain.smartContracts "Makes calls to"
    }

    views {
        systemContext relicChain "systemContext" {
            include *
            autolayout tb
        }

        container relicChain "RelicChain" {
            include *
            exclude "relicBuyer->metaMask"
            exclude "relicOwner->metaMask"
            autolayout tb
        }

        component relicChain.webApplication "WebApplication" {
            include *
            autolayout tb
        }

        styles {
            element "Element" {
                color #ffffff
            }
            element "Person" {
                background #1111FF
                shape person
            }
            element "Software System" {
                background #5555FF
            }
            element "Container" {
                background #7777FF
            }
            element "metaMask" {
                background #333333
            }
            element "Ipfs" {
                background #333333
            }
            element "Blockchain" {
                background #333333
            }
            element "Component" {
                background #5555FF
            }
        }
    }

    configuration {
        scope softwaresystem
    }
}
