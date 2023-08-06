import {
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
    const { data: ensAvatar } = useEnsAvatar({ address });
    const { data: ensName } = useEnsName({ address });
    const { disconnect } = useDisconnect();

    const {connect, connectors, error, isLoading, pendingConnector} = useConnect({async onSuccess(data) {

            try {
                const response = await axios.post("/api/user",{address:data.account});

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

    function modalData(): ReactNode {
        if (isConnected) {
            return (
                <div>
                    <img src={ensAvatar} alt="ENS Avatar" />
                    <div>{ensName ? `${ensName} (${address})` : address}</div>

                    <button onClick={disconnect}>Disconnect</button>
                </div>
            )
        }

        return (<>
                <h3 className="font-bold text-lg">Connect Wallet</h3>
                <div>
                    {connectors.map((connector, index) => (
                        <button
                            key={index}
                            //disabled={!connector.ready}
                            onClick={() => connect({connector})}
                        >
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
            <button onClick={handleConnect} className="btn btn-primary">Connect Wallet</button>
        </>
    )
}
