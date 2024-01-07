import { Controller, Get } from '@nestjs/common';
import { LdService } from './ldService.service';

@Controller('flag')
export class AppController {
  constructor(private readonly ldService: LdService) { }
  private feature_flag_key = 'show-feature-backend';

  @Get()
  async getFeatureFlags() {
    const flagValue = await this.ldService.getFeatureFlagValue(this.feature_flag_key);
    const response = flagValue
      ? { message: 'Feature flag is enabled', flagValue }
      : { message: 'Feature flag is disabled', flagValue };
    return response;
  }
}
