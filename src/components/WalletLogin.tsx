import {
    Connector,
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from "wagmi";
import {createPublicClient, http} from "viem";
import Image from "next/image";
import {ReactNode} from "react";
import User from "@/models/UserModel";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function WalletLogin() {

    const { address, connector, isConnected } = useAccount();
    const { data: ensAvatar } = useEnsAvatar();
    const { data: ensName } = useEnsName({ address });
    const { disconnect } = useDisconnect();

    const {connect, connectors, error, isLoading, pendingConnector} = useConnect({async onSuccess(data) {

            try {
                const response = await axios.post("/api/user/login",{address:data.account});

                toast.success(response.data);
                console.log("Already done ",response.data);
            } catch (error:any) {
                toast.error(error.message);
                console.log("Register Failed",error.message);
            }
        }});


    function handleConnect() {
        const modal = document.getElementById("conWallModal") as HTMLDialogElement
        modal.showModal();
    }

    function connectorLogo(connector:Connector): ReactNode {
        switch(connector.id) {
            case "metaMask" : 
                return (<Image src={"/static/media/meta-mask.svg"} alt="" width={24} height={24} />)
            case "walletConnect" : 
                return (<Image src={"/static/media/wallet-connect.svg"} alt="" width={24} height={24} />)
            default:
                return (<Image src={"/static/media/meta-mask.svg"} alt="" width={24} height={24} />)
        }
    }

    function modalData(): ReactNode {
        if (isConnected) {
            return (
                <div>
                    <img src={ensAvatar as string} alt="ENS Avatar" />
                    <div>{ensName ? `${ensName} (${address})` : address}</div>

                    <button onClick={() => {disconnect}}>Disconnect</button>
                </div>
            )
        }

        return (<>
                <h3 className="font-bold text-lg">Connect Wallet</h3>
                <div>
                    {connectors.map((connector, index) => (
                        <button
                            className="btn btn-outline btn-block mt-3 justify-start"
                            key={index}
                            //disabled={!connector.ready}
                            onClick={() => connect({connector})}
                        >
                            {connectorLogo(connector)}
                            {connector.name}
                            {!connector.ready && ' (unsupported)'}
                            {isLoading &&
                                connector.id === pendingConnector?.id &&
                                ' (connecting)'}
                        </button>

                    ))
                    }
                </div>
                {error && <div>{error.message}</div>}
            </>)
    }


    return (
        <>
            <dialog id="conWallModal" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {modalData()}
                </form>
            </dialog>
            <button onClick={handleConnect} className="btn btn-outline btn-info btn-sm rounded-md ">Connect Wallet</button>
        </>
    )
}
