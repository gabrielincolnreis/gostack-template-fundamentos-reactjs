import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface ResponseData {
  balance: Balance;
  transactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const [balances, setBalances] = useState<Balance>({} as Balance);
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<ResponseData>(`transactions`);

      const { transactions, balance } = response.data;

      setTransaction([...transaction, ...transactions]);

      setBalances(balance);
    }

    loadTransactions();
  }, [transaction]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balances.income)}</h1>
          </Card>

          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balances.outcome)}
            </h1>
          </Card>

          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balances.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transaction.map(transactionItem => (
                <tr key={transactionItem.id}>
                  <td className="title">{transactionItem.title}</td>
                  <td className={transactionItem.type}>
                    {transactionItem.type === 'outcome' ? '- ' : ''}
                    {formatValue(transactionItem.value)}
                  </td>
                  <td>{transactionItem.category.title}</td>
                  <td>{formatDate(transactionItem.created_at)}</td>
                </tr>

                /* {transactionItem.type === 'outcome' ? '-' : ''}

                <tr key={transactionItem.id}>
                  <td className="title">{transactionItem.title}</td>
                  <td className="outcome">
                    {formatValue(transactionItem.value)}
                  </td>
                  <td>{transactionItem.category.title}</td>
                  <td>{formatDate(transactionItem.created_at)}</td>
                </tr> */
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
