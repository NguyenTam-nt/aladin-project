import { StringSchema, AnySchema, ArraySchema, NumberSchema } from "yup";

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = ''
    > extends Schema<TType, TContext, TDefault, TFlags> {
    isEditorRequired(msg: string): StringSchema;
  }
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = ''
    > extends Schema<TIn, TContext, TDefault, TFlags> {
    requiredAtLeast(msg: string): ArraySchema;
  }
}