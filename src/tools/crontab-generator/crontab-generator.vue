<script setup lang="ts">
import cronstrue from 'cronstrue';
import 'cronstrue/locales/pt_BR';
import { isValidCron } from 'cron-validator';
import { useStyleStore } from '@/stores/style.store';

function isCronValid(v: string) {
  return isValidCron(v, { allowBlankDay: true, alias: true, seconds: true });
}

const styleStore = useStyleStore();
const { t, locale } = useI18n();

const cron = ref('40 * * * *');
const cronstrueConfig = reactive({
  verbose: true,
  dayOfWeekStartIndexZero: true,
  use24HourTimeFormat: true,
  throwExceptionOnParseError: true,
});

const helpers = [
  {
    symbol: '*',
    meaning: t('tools.crontab-generator.helpers.any.meaning'),
    example: '* * * *',
    equivalent: t('tools.crontab-generator.helpers.any.equivalent'),
  },
  {
    symbol: '-',
    meaning: t('tools.crontab-generator.helpers.range.meaning'),
    example: '1-10 * * *',
    equivalent: t('tools.crontab-generator.helpers.range.equivalent'),
  },
  {
    symbol: ',',
    meaning: t('tools.crontab-generator.helpers.list.meaning'),
    example: '1,10 * * *',
    equivalent: t('tools.crontab-generator.helpers.list.equivalent'),
  },
  {
    symbol: '/',
    meaning: t('tools.crontab-generator.helpers.step.meaning'),
    example: '*/10 * * *',
    equivalent: t('tools.crontab-generator.helpers.step.equivalent'),
  },
  {
    symbol: '@yearly',
    meaning: t('tools.crontab-generator.helpers.yearly.meaning'),
    example: '@yearly',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@annually',
    meaning: t('tools.crontab-generator.helpers.annually.meaning'),
    example: '@annually',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@monthly',
    meaning: t('tools.crontab-generator.helpers.monthly.meaning'),
    example: '@monthly',
    equivalent: '0 0 1 * *',
  },
  {
    symbol: '@weekly',
    meaning: t('tools.crontab-generator.helpers.weekly.meaning'),
    example: '@weekly',
    equivalent: '0 0 * * 0',
  },
  {
    symbol: '@daily',
    meaning: t('tools.crontab-generator.helpers.daily.meaning'),
    example: '@daily',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@midnight',
    meaning: t('tools.crontab-generator.helpers.midnight.meaning'),
    example: '@midnight',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@hourly',
    meaning: t('tools.crontab-generator.helpers.hourly.meaning'),
    example: '@hourly',
    equivalent: '0 * * * *',
  },
  {
    symbol: '@reboot',
    meaning: t('tools.crontab-generator.helpers.reboot.meaning'),
    example: '',
    equivalent: '',
  },
];

const cronString = computed(() => {
  if (isCronValid(cron.value)) {
    return cronstrue.toString(cron.value, { ...cronstrueConfig, locale: locale.value === 'pt' ? 'pt_BR' : 'en' });
  }
  return ' ';
});

const cronValidationRules = [
  {
    validator: (value: string) => isCronValid(value),
    message: t('tools.crontab-generator.invalid'),
  },
];
</script>

<template>
  <c-card>
    <div mx-auto max-w-sm>
      <c-input-text
        v-model:value="cron"
        size="large"
        placeholder="* * * * *"
        :validation-rules="cronValidationRules"
        mb-3
      />
    </div>

    <div class="cron-string">
      {{ cronString }}
    </div>

    <n-divider />

    <div flex justify-center>
      <n-form :show-feedback="false" label-width="170" label-placement="left">
        <n-form-item :label="t('tools.crontab-generator.verbose')">
          <n-switch v-model:value="cronstrueConfig.verbose" :aria-label="t('tools.crontab-generator.verbose')" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.use24Hour')">
          <n-switch v-model:value="cronstrueConfig.use24HourTimeFormat" :aria-label="t('tools.crontab-generator.use24Hour')" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.daysStartAtZero')">
          <n-switch v-model:value="cronstrueConfig.dayOfWeekStartIndexZero" :aria-label="t('tools.crontab-generator.daysStartAtZero')" />
        </n-form-item>
      </n-form>
    </div>
  </c-card>
  <c-card>
    <pre>
┌──────────── {{ t('tools.crontab-generator.diagram.seconds') }}
| ┌────────── {{ t('tools.crontab-generator.diagram.minute') }}
| | ┌──────── {{ t('tools.crontab-generator.diagram.hour') }}
| | | ┌────── {{ t('tools.crontab-generator.diagram.dayOfMonth') }}
| | | | ┌──── {{ t('tools.crontab-generator.diagram.month') }}
| | | | | ┌── {{ t('tools.crontab-generator.diagram.dayOfWeek') }}
| | | | | |
* * * * * * {{ t('tools.crontab-generator.diagram.command') }}</pre>

    <div v-if="styleStore.isSmallScreen">
      <c-card v-for="{ symbol, meaning, example, equivalent } in helpers" :key="symbol" mb-3 important:border-none>
        <div>
          {{ t('tools.crontab-generator.symbol') }}: <strong>{{ symbol }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.meaning') }}: <strong>{{ meaning }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.example') }}:
          <strong><code>{{ example }}</code></strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.equivalent') }}: <strong>{{ equivalent }}</strong>
        </div>
      </c-card>
    </div>

    <c-table v-else :data="helpers" :headers="[{ key: 'symbol', label: t('tools.crontab-generator.symbol') }, { key: 'meaning', label: t('tools.crontab-generator.meaning') }, { key: 'example', label: t('tools.crontab-generator.example') }, { key: 'equivalent', label: t('tools.crontab-generator.equivalent') }]" />
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;
}

pre {
  overflow: auto;
  padding: 10px 0;
}
</style>
