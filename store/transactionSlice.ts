import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LastTransactionProps, TransactionStateProps } from "@/typings/transaction-typings"

const initialState: TransactionStateProps = {
    lastTransaction: {
        transactionId: undefined,
        userId: undefined,
    } 
}

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        setLastTransaction: (state: TransactionStateProps, action: PayloadAction<Partial<LastTransactionProps>>) => {
            state.lastTransaction = {
                ...state.lastTransaction,
                ...action.payload,
            }
        }
    }
})

export const { setLastTransaction } = transactionSlice.actions

export const selectLastTransaction = (state: {transactions: TransactionStateProps}) => {
    return state.transactions.lastTransaction;
}

export default transactionSlice.reducer