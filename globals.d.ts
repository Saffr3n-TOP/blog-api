declare module 'mongoose' {
  function connect(
    uri?: string,
    options?: ConnectOptions | undefined
  ): Promise<Mongoose>;
}
