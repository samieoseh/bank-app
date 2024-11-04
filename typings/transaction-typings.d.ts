export interface TransactionReciepientProps {
    fullName: string;
    id: string;
    username: string;
}

export interface TransactionNotificationProps {
  receiver: {
    id: string;
  };
  sender: {
    id: string;
  };
  transactionAmount: number;
  transactionType: string;
  transactionDate: number;
}

export interface LastTransactionProps {
        transactionId: String | undefined,
        userId: String | undefined,
}
    
export interface TransactionStateProps {
  lastTransaction: LastTransactionProps;
}