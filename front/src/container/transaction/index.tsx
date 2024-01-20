import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

import Page from "../../page";
import Header from "../../component/header";
import ArrowBack from "../../component/history-back";
import Divider from "../../component/divider";


interface transactionProps {
    children: React.ReactNode;
    className?: React.CSSProperties;
}

interface Transaction {
    source: string,
    amount: number,
    date: string,
    transactionId: number,
    type: string,
}

const Transaction: React.FC<transactionProps> = ({children, className = ""}) => {
    const [info, setInfo] = useState<Transaction | null>(null);

    const {id} = useParams<{id?: any}>();

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:4000/transaction?id=${id}`);

            if (!res.ok) {
                throw new Error("Error to get a data")
            }

            const data = await res.json();
            setInfo(data.info);
        } catch (e) {
            console.error("Error to get a data from the server... try again: ", e)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Page>
            <section className="transaction-page">
                <div className="transaction__heading">
                    <ArrowBack />
                    <Header title="Transaction" className="heading__title--account"/>
                </div>

                <h1 className={`amount ${info?.type === "send" ? "amount--send" : "amount--receive"}`}>
                    {info?.type === "send" ? `- $${info?.amount}` : `+ $${info?.amount}`}
                </h1>

                <div className="card">
                    <div className="card__line">
                        <p>Date</p>
                        <p>{info?.date}</p>
                    </div>
                    <Divider />
                    <div className="card__line">
                        <p>Address</p>
                        <p>{info?.source}</p>
                    </div>
                    <Divider />
                    <div className="card__line">
                        <p>Type</p>
                        <p>{info?.type}</p>
                    </div>
                </div>
            </section>
        </Page>
    )
}

export default Transaction;