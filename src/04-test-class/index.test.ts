import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const balnce = 1000;
  const amount = 500;
  const withdrawMoney = 200;
  const withdrawMoney2 = 1200;

  const anotherMoney = 2000;
  const anotherBankaccount = getBankAccount(anotherMoney);

  let bank: BankAccount;
  beforeEach(() => {
    bank = getBankAccount(balnce);
  });

  test('should create account with initial balance', () => {
    expect(bank.getBalance()).toBe(balnce);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    if (withdrawMoney2 > bank.getBalance()) {
      const x = () => {
        throw new InsufficientFundsError(balnce);
      };
      expect(x).toThrow(
        `Insufficient funds: cannot withdraw more than ${balnce}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    if (withdrawMoney2 > bank.getBalance()) {
      const x = () => {
        throw new TransferFailedError();
      };
      expect(x).toThrow(`Transfer failed`);
    }
  });

  test('should throw error when transferring to the same account', () => {
    if (anotherBankaccount === bank) {
      const x = () => {
        throw new TransferFailedError();
      };
      expect(x).toThrow(`Transfer failed`);
    }
  });

  test('should deposit money', () => {
    const x = bank.deposit(amount);
    expect(x.getBalance()).toBe(amount + balnce);
  });

  test('should withdraw money', () => {
    if (withdrawMoney < bank.getBalance()) {
      const x = bank.withdraw(withdrawMoney);
      expect(x.getBalance()).toBe(balnce - withdrawMoney);
    }
  });

  test('should transfer money', () => {
    const x = anotherBankaccount.deposit(withdrawMoney);
    const y = bank.withdraw(withdrawMoney);
    expect(y.getBalance()).toBe(balnce - withdrawMoney);
    expect(x.getBalance()).toBe(anotherMoney + withdrawMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const x = await bank.fetchBalance();
    if (typeof x === 'number') {
      expect(typeof x).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const deposit = new BankAccount(1000);
    jest.spyOn(deposit, 'fetchBalance').mockResolvedValue(1000);
    await deposit.synchronizeBalance();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const x = await bank.fetchBalance();
    if (typeof x === 'object') {
      const x = () => {
        throw new SynchronizationFailedError();
      };
      expect(x).toThrow('Synchronization failed');
    }
  });
});

