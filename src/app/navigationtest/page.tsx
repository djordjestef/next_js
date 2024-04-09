'use client'
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const NavigationTestPage = ()=>{

    //CLIENT SIDE NAVIGATION
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const q = searchParams.get('q')

    console.log('pathname',pathname)
    console.log('router',router)
  
    console.log('q',q)


    const handleClick = ()=>{
        router.push('/')

    }
    return <div>
        <Link href="/" prefetch={false}>click</Link>
        <button onClick={handleClick}>Write and Redirect</button>
    </div>
}

export default NavigationTestPage