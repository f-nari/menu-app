import React from 'react'
import picture from '../../img/55006CFD-8C14-43E0-8D23-85391213A88A.jpg'
import Image from 'next/image'

const Recipe_Creation = () => {
  return (
    <div className='flex justify-center  h-screen text-[#4a4a4a]'>
      {/* 詳細ゾーン */}
      <div className='w-11/12 flex flex-col  h-full '>
        {/* 上ゾーン */}
        <div className='flex mt-6' >
          <div>
            <Image src={picture} height={500} width={500} alt='' className='rounded-2xl shadow-xl'></Image>
          </div>
          {/*説明ゾーン */}
          <div className='flex flex-col ml-3 '>
            <input type='text' className='text-3xl bg-[#f8f6f1] rounded-sm' placeholder='ハンバーグ' />
            <p>作成者 廣川郁也</p>
            <p className='text-2xl font-bold mt-5'>材料</p>
            <div className='flex '>
              <label htmlFor="" className='mr-4'>材料名</label>
              <input type="text" placeholder='ひき肉' className='bg-[#f8f6f1] rounded-sm' />
              <label htmlFor="" className='mr-4 ml-4' >量</label>
              <input type="text" placeholder='300' className='bg-[#f8f6f1] rounded-sm w-20' />
              <label htmlFor="" className='mr-4 ml-4'>単位</label>
              <input type="text" placeholder='g' className='bg-[#f8f6f1] rounded-sm w-20' />
            </div>
          </div>
        </div>
        {/*下ゾーン memozorn*/}
        <div className='flex flex-col grow mt-5 '>
          <h1 className='h-6'>memo</h1>
          <input type="text" className='w-full  grow rounded-sm bg-[#f8f6f1] mb-2' placeholder='コツやポイント' />
        </div>
      </div>
    </div>
  )
}

export default Recipe_Creation
