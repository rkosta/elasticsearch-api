import { z } from "zod"

/* The `export interface Config` statement is defining an interface named `Config`. An interface in
TypeScript is a way to define the structure of an object. In this case, the `Config` interface has
two properties: `ElasticSearchUrl` and `ElasticSearchApiKey`, both of which are of type `string`. */
export interface Config {
    ElasticSearchUrl: string,
    ElasticSearchApiKey: string,
}


/**
 * The getConfig function returns a Config object with the ElasticSearchUrl and ElasticSearchApiKey
 * properties.
 * @returns a Config object.
 */
function getConfig() : Config {
    let config : Config  =   {
        ElasticSearchUrl: process.env.ELASTICSEARCH_URL,
        ElasticSearchApiKey: process.env.ELASTICSEARCH_API_KEY
    }
    return config
}



/* The `const configSchema` statement is defining a schema using the `zod` library. */
export const configSchema = z.object({
        ElasticSearchUrl: z.string(
            {
                invalid_type_error: "elasticsearch url invalid type",
                required_error: "elasticsearch url is required"
            }
        ).url({
            message: "Invalid elasticsearch url"
        }),
        ElasticSearchApiKey: z.string(
            {
                invalid_type_error: "elasticsearch API key invalid type",
                required_error: "elasticsearch API key is required"
            }
        ).nonempty({
            message: "elasticsearch API key is required"
        })
    })

/**
 * The function "validateConfig" takes a "config" object and validates it against a schema.
 * @param {Config} config - The `config` parameter is an object that represents a configuration.
 */
export function validateConfig(config: Config): void{

    configSchema.parse(config)

}

/* The line `const config: Config = getConfig()` is assigning the result of the `getConfig()` function
to a constant variable named `config`. The `getConfig()` function returns a `Config` object, and by
assigning it to the `config` variable, we are ensuring that the `config` variable will have the same
structure as the `Config` interface. */
export const config: Config = getConfig()