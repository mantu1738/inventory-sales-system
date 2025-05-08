export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface Alert {
  message: string;
  type: AlertType;
}
