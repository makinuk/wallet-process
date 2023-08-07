"use client"

import Link from "next/link";
import { useAccount } from "wagmi";

export default function LeftMenu() {

  const {isConnected} = useAccount()
  const token = cookieStore.get("token")?.value || ""

    if (!isConnected) {
      return (<></>)
    }
  

    return (<ul className="menu bg-base-200 w-56">
    <li>
      <details open>
        <summary>WORLDCOIN</summary>
        <ul>
          <li><Link href="/worldcoin/cloud-verify">Cloud Verify</Link></li>
          <li><Link href="" onClick={() => {alert("Not Done Yet")}}>On Chain Verify</Link></li>
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li><Link href="/profile">Profile</Link></li>
                <li><a>level 3 item 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li><a>Item 3</a></li>
  </ul>)
}