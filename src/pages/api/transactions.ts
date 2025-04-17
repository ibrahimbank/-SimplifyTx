let transactions = [
    {
        id: "TRX001",
        amount: 1500.0,
        status: "Completed",
        date: "2024-10-28"
    },
    {
        id: "TRX002",
        amount: 500.5,
        status: "Pending",
        date: "2024-10-27"
    }
];

export default function handler(req: any, res: any) {
    if (req.method === 'GET') {
        res.status(200).json(transactions);
    } else if (req.method === 'POST') {
        const newTransaction = req.body;
        transactions.push(newTransaction);
        res.status(201).json(newTransaction);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
