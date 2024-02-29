import Link from "next/link";
import Image from "next/image";
import { Title, Button } from "rizzui";
import { PiHouseLineBold } from "react-icons/pi";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col bg-[#F8FAFC]'>
      <div className='sticky top-0 z-40 flex justify-center py-5 backdrop-blur-lg lg:backdrop-blur-none xl:py-10'>
        <Link href='/'>Logo</Link>
      </div>

      <div className='flex grow items-center px-6 xl:px-10'>
        <div className='mx-auto text-center'>
          <Title as='h1' className='text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl'>
            Sorry, the page not found
          </Title>
          <p className='mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose'>
            We have been spending long hours in order to launch our new website. Join our
            <br className='hidden sm:inline-block' />
            mailing list or follow us on Facebook for get latest update.
          </p>
          <Link href={"/"}>
            <Button as='span' size='xl' color='primary' className='mt-8 h-12 px-4 xl:h-14 xl:px-6'>
              <PiHouseLineBold className='mr-1.5 text-lg' />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
