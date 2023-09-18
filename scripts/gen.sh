#!/bin/bash

# Path to this plugin, Note this must be an abolsute path on Windows (see #15)
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Path to the grpc_node_plugin
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

ROOT_DIR="./proto"
OUTPUT_DIR="./src/generated"

rm -rf "${OUTPUT_DIR}" && mkdir -p "${OUTPUT_DIR}"

find $ROOT_DIR -name "*.proto" -exec \
  protoc \
      --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
      --plugin="protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH}" \
      --js_out="import_style=commonjs,binary:${OUTPUT_DIR}" \
      --ts_out="service=grpc-node,mode=grpc-js:${OUTPUT_DIR}" \
      --grpc_out="grpc_js:${OUTPUT_DIR}" \
      -I $ROOT_DIR \
      {} \;
