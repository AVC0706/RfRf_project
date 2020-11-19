import React from 'react'
import {OrganizationChart} from 'primereact/organizationchart';

function MandalNetwork() {
    const data = [{
        label: 'Country Lead',
        expanded: true,
        children: [
            {
                label: 'Area Lead',
                expanded: true,
                children: [
                    {
                        label: 'State Lead'
                    },
                    {
                        label: 'State Lead'
                    }
                ]
            },
            {
                label: 'Area Lead',
                expanded: true,
                children: [
                    {
                        label: 'State Lead'
                    },
                    {
                        label: 'State Lead'
                    }
                ]
            },
        ]
    }]
    return (
        <div>
            <br></br>
            <br></br>
            <OrganizationChart value={data}></OrganizationChart>
        </div>
    )
}

export default MandalNetwork
