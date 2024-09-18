export default class ContaBancaria {
    private numeroConta: number;
    private agencia = 1;
    private saldo = 0;
    private extrato: string[] = [];
  
    constructor(numeroConta: number) {
      this.numeroConta = numeroConta;
    }
  
    public depositar(valor: number) {
      if (valor > 0) {
        this.saldo += valor;
        this.registrarOperacao(`Depósito: R$${valor}`);
      }
    }
  
    public sacar(valor: number) {
      if (this.saldo >= valor) {
        this.saldo -= valor;
        this.registrarOperacao(`Saque: R$${valor}`);
        return valor;
      }
      throw new Error("Saldo insuficiente");
    }
  
    public transferir(valor: number, contaDestino: ContaBancaria) {
      if (this.saldo >= valor) {
        this.saldo -= valor;
        contaDestino.depositar(valor);
        this.registrarOperacao(`Transferência: R$${valor} para a conta ${contaDestino.numeroConta}`);
      } else {
        throw new Error("Saldo insuficiente para transferência");
      }
    }
  
    public consultarSaldo() {
      return this.saldo;
    }
  
    public exibirExtrato() {
      return this.extrato.join('\n');
    }
  
    private registrarOperacao(descricao: string) {
      const data = new Date().toISOString();
      this.extrato.push(`${data} - ${descricao}`);
    }
  }
  