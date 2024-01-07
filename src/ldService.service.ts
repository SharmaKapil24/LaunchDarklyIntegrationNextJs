import { Injectable, Scope } from '@nestjs/common';
import * as ld from '@launchdarkly/node-server-sdk';

@Injectable({ scope: Scope.DEFAULT })
export class LdService {
  private ldClient: ld.LDClient;
  private context: ld.LDContext = {
    kind: 'user',
    key: 'user-key-test',
    firstName: 'kapil',
    email: 'kapil@example.com'
  };
  constructor() {
    this.initialiseClient();
  }

  async initialiseClient() {
    try {
      this.ldClient = ld.init(process.env.LAUNCHDARKLY_SDK_KEY);
      await this.ldClient.waitForInitialization();
      console.log('LaunchDarkly SDK initialised');
    } catch (error) {
      console.log('Error initialising LaunchDarkly SDK: ', error.message);
    }
  }

  async getFeatureFlagValue(flagName: string): Promise<boolean> {
    try {
      const flagValue: boolean = await this.ldClient.variation(flagName, this.context, false);
      return flagValue;
    } catch (error) {
      console.error(`Error fetching feature flag value for ${flagName}: ${error}`);
      return false;
    }
  }
}

