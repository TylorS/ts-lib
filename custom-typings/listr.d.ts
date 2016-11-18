declare module 'listr' {
  namespace Listr {
    interface Task {
      title: string;
      task: (context?: any) => any;
      skip?: (context?: any) => string | void;
    }

    interface Options {
      concurrent?: boolean;
      renderer?: 'default' | 'verbose' | 'silent';
    }
  }

  class Listr {
    constructor (tasks: Array<Listr.Task>, options?: Listr.Options);
    add(task: Listr.Task): Listr;
    run(context?: any): Promise<any>;
  }

  export = Listr;
}