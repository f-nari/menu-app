import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import picture from '../../img/55006CFD-8C14-43E0-8D23-85391213A88A.jpg'


const Menu_Creation = () => {
  return (
    <div className="w-full flex justify-center h-full">
      <div className="w-11/12 flex flex-col  text-center mt-6 ">
        {/* タイトルゾーン */}
        <div className=" flex justify-center flex-col ">
          <h1 className="text-3xl ">献立作成</h1>
        </div>
        {/* ここから献立作成 */}
        <div className="h-60 flex justify-between text-center ">
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12 ">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50  h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        {/* レシピゾーン */}
        <div className="w-full grid grid-cols-5 gap-4">
          {/* カード */}
          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>
          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>

          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>

          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>

          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>
          <div className=" w-50 h-60 shadow-md rounded-2xl mr-5">
            <div className="w-full  h-40 rounded-t-lg">
              <Image src={picture} width={500} height={500} alt="" className="rounded-t-lg"></Image>
            </div>
            <div>題名題名題名</div>
            <Link href=''>詳細へ</Link>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Menu_Creation