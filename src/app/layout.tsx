"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import Header from "@/components/Header";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import {WalletConnectConnector} from "@wagmi/connectors/walletConnect";
import {CoinbaseWalletConnector} from "@wagmi/connectors/coinbaseWallet";
import {InjectedConnector} from "@wagmi/connectors/injected";
import {optimism, polygon} from "@wagmi/chains";
import LeftMenu from '@/components/LeftMenu';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [mainnet,polygon,optimism],
        [alchemyProvider({ apiKey: 'lsERNeRav-4vxD6h1Rf4sVg1RhoKwY7L' }), publicProvider()],
    )

  const config = createConfig({
      autoConnect:true,
      connectors:[
          new MetaMaskConnector({chains}),
          new WalletConnectConnector({
              chains,
              options:{
                  projectId:"497499be6d14a6f6f92aed30dc94bd71"
              }
          }),
          /*
                    new CoinbaseWalletConnector({
                        chains,
                        options:{
                            appName:"Wallet Process"
                        }
                    }),
                    new InjectedConnector({
                        chains,
                        options:{
                            name:"Injected",
                            shimDisconnect:true
                        }
                    })*/
      ],
      publicClient,
      webSocketPublicClient
  })

  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiConfig config={config}>
          <Header />
          <div id="sidebar" className="float-left">
            <LeftMenu />
          </div>
          <div className='float-left ml-4'>
          {children}
          </div>
      </WagmiConfig>
      </body>
    </html>
  )
}
