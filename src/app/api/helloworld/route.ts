import * as grpc from '@grpc/grpc-js';
import * as pb from '@/generated/helloworld_pb';
import { GreeterClient } from '@/generated/helloworld_grpc_pb';
import { NextResponse } from 'next/server';

const handler = async (req: Request) => {
  const body = await req.json();

  const client = new GreeterClient(process.env.GRPC_HOST, grpc.credentials.createInsecure());
  const request = new pb.HelloRequest();
  request.setName(body.name);

  const sayHelloAsync: (req: pb.HelloRequest) => Promise<pb.HelloReply | undefined> = (req) => {
    return new Promise((resolve, reject) => {
      client.sayHello(req, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };

  try {
    const response = await sayHelloAsync(request);
    return NextResponse.json(response?.getMessage(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 422 });
  }
};

export { handler as POST };
