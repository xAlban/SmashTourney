import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  // API INSTANCE so we have the same in the app
  static apiInstance: Api = null

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  static getInstance(){
    if(Api.apiInstance === null){
      Api.apiInstance = new Api()
      this.apiInstance.setup()
    }
    return this.apiInstance
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + '3fed2644863a16dff74a2acaf96702d7'
      },
    })
  }

  /**
   * Gets a list of tournaments filtered by name.
   */
  async getTournamentsWithName(name: string): Promise<Types.GetTournamentsWithName> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('', 
    JSON.stringify({
      query: `
        query GET_TOURNAMENT_BY_NAME_AND_COUNTRY($name: String!) {
          tournaments(query: {
            perPage: 10
            filter: {
              name: $name
            }
          }) {
            nodes {
              id
              name
              countryCode
              city
              images {
                url
              }
            }
          }
        }
      `,
      variables: {
        name: name,
      }
    })
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertTournament = raw => {
      return {
        id: raw.id,
        name: raw.name,
        countryCode: raw.countryCode,
        city: raw.city,
        images: raw.images
      }
    }
    // console.log("RESPONSE API: ", response.data.data.tournaments.nodes[0].images)

     // transform the data into the format we are expecting
     try {
      const rawTournaments = response.data.data.tournaments.nodes
      const resultTournaments: Types.Tournament[] = rawTournaments.map(convertTournament)
      return { kind: "ok", tournaments: resultTournaments }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
