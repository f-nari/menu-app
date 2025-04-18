import Image from 'next/image'
import React from 'react'
import picture from '../../../img/55006CFD-8C14-43E0-8D23-85391213A88A.jpg'

const Recipe = () => {
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
            <h1 className='text-3xl'>題名 ハンバーグ</h1>
            <p>作成者 廣川郁也</p>
            <p>材料</p>
            <div className='table-auto'>
              <thead>
                <tr>
                  <th>食材名</th>
                  <th>量</th>
                  <th>単位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ひき肉</td>
                  <td>400</td>
                  <td>g</td>
                </tr>
                <tr>
                  <td>たまねぎ</td>
                  <td>1</td>
                  <td>個</td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
        {/*下ゾーン memozorn*/}
        <div className='flex flex-col grow mt-5 '>
          <h1 className='h-6'>memo</h1>
          <div className='w-full border grow rounded-2xl mb-2 '></div>
        </div>
      </div>
    </div>
  )
}

export default Recipe