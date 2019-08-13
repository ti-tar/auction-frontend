export default interface lotInterface {
  title: string,
  image?: string,
  description?: string,
  status: string,
  createAt :string,
  currentPrice: number,
  estimatedPrice: number,
  lotStartTime: string,
  lotEndTime: string,
}

// Statuses: 
// pending - by default;
// inProcess - changed, when lot start time become;
// closed - changed, when lot end time become or any customer propose max estimated price. 
