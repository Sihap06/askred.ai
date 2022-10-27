import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    setting: <AiOutlineSetting />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />
}

export default navigationIcon