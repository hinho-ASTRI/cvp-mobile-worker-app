import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/core";

const ajv = new Ajv({ allErrors: true });
const ajv1 = new Ajv({ allErrors: true });

const ScannedCertFieldSchema = {
  type: "object",
  properties: {
    UUID: { type: "string" },
    date: { type: "string" },
    timeStamp: { type: "integer" },
  },
  required: ["UUID", "date", "timeStamp"],
  additionalProperties: false,
} as const;

const ScannedWorkerFieldSchema = {
  type: "object",
  properties: {
    date: { type: "string" },
    timeStamp: { type: "integer" },
    username: { type: "string" },
  },
  required: ["date", "timeStamp", "username"],
  additionalProperties: false,
} as const;

type ScannedCertField = JTDDataType<typeof ScannedCertFieldSchema>;
type ScannedWorkerField = JTDDataType<typeof ScannedWorkerFieldSchema>;

export const validateScannedCert = ajv.compile<ScannedCertField>(
  ScannedCertFieldSchema
);

export const validateScannerUser = ajv1.compile<ScannedWorkerField>(
  ScannedWorkerFieldSchema
);
