import React, { ChangeEvent } from 'react'

const CustomerDelete = ({cusID, stateRefresh}:{cusID: any, stateRefresh:()=>void}) => {
    const deleteCustomer = (id:number) => {
        const url = `/api/customers/` + id;
        console.log("[url]",url);
        fetch(url, {method: "DELETE"});
        stateRefresh();
    }

    // const onClickDelete = (e:ChangeEvent<HTMLElement>) => {
    //     console.log(cusID);
    //     console.log(typeof cusID);

    // }

  return (
    <button onClick={()=>deleteCustomer(cusID)}>
        삭제
    </button>
  )
}

export default CustomerDelete
