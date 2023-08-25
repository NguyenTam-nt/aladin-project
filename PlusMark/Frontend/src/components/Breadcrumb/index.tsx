import NextIcon from "@assets/iconElements/NextIcon";
import { NextArrowIcon } from "@assets/icons";
import { PrevIcon } from "@assets/icons/plust-mark/PrevIcon";
import { colors } from "@utility/colors";
import { firstUpper, some } from "@utility/helper";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type BreadcrumbType = {
  name: string;
  link: string;
  active: boolean;
  clickable: boolean;
};

type Props = {
  data: BreadcrumbType[];
  lastData?: BreadcrumbType;
  normalClass: string;
  activeClass: string;
};

function BreakCrumb({ data, lastData, normalClass, activeClass }: Props) {
  const [breakcrumData, setbreakcrumData] = useState(data);

    useEffect(() => {
        setbreakcrumData(data)
        if (lastData) {
            setbreakcrumData([...data, lastData])
        }
    }, [data, lastData])

    return (
        <div className={`flex items-center gap-2 text-normal1 ${normalClass} `} >
            {
                breakcrumData.map((d, i) => {
                    if (d.clickable) {
                        if (i < breakcrumData.length - 1) {
                            return <Fragment key={i}>
                                <Link to={d.link} className={`whitespace-nowrap ${d.active && activeClass}`}>{firstUpper(d.name)}</Link>
                                <div className='rotate-90'>
                                    <PrevIcon />
                                </div>
                            </Fragment>
                        }
                        return <Link key={i} to={d.link} className={`whitespace-nowrap ${d.active && activeClass}`}>{firstUpper(d.name)}</Link>
                    }

                    if (i < breakcrumData.length - 1) {
                        return <Fragment key={i}>
                            <span className={`whitespace-nowrap ${d.active && activeClass}`}>{firstUpper(d.name)} </span>
                            <div className='rotate-90'>
                                <PrevIcon />
                            </div>
                        </Fragment>
                    }
                    return <span key={i} className={``}>{firstUpper(d.name)}</span>
                })
            }
        </div>
    )
}

export default BreakCrumb;
