import React, { useCallback, useState } from 'react'
import BlueGradientButton from '../ui/BlueGradientButton'
import Input from '../ui/Input'
import ModalOverlay from './ModalOverlay'

function HeaderMenuModal({addMenuItem,setOpenMenuModal}) {
    const [itemName,setItemName] = useState("")
    const [itemLink,setItemLink] = useState("")
    const addHandler = useCallback(()=>{
        addMenuItem({itemName,itemLink})
        setOpenMenuModal(false)
    })
  return (
    <ModalOverlay>
        <div className='py-8 px-14 flex flex-col gap-4 items-center'>
            <div className='font-bold'>Add Header Menu Item</div>
            <div className='flex flex-col border rounded-md py-3 px-4 gap-3 max-w-xs'>
                <Input onChange={(e)=>setItemName(e.target.value)}  value={itemName} description="Item Name" type="text" />
                <div className='flex flex-col gap-1'>
                <Input onChange={e => setItemLink(e.target.value)} value={itemLink} description="Item Link" type="text" />
                <div className='text-[9px]'>Enter URL or page name where you want to redirect when user click on this name in header </div>
                </div>
            </div>
            <BlueGradientButton disabled={!itemName && !itemLink} onClick={addHandler}>Add item</BlueGradientButton>
        </div>
    </ModalOverlay>
  )
}

export default HeaderMenuModal