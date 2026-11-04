<script setup lang="ts">
import { convertBase } from '../integer-base-converter/integer-base-converter.model';
import { ipv4ToInt, ipv4ToIpv6, isValidIpv4 } from './ipv4-address-converter.service';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

// Não salva no navegador o texto digitado (LGPD); preferências continuam salvas
const rawIpAddress = ref('192.168.1.1');

const convertedSections = computed(() => {
  const ipInDecimal = ipv4ToInt({ ip: rawIpAddress.value });

  return [
    {
      label: 'Decimal: ',
      value: String(ipInDecimal),
    },
    {
      label: 'Hexadecimal: ',
      value: convertBase({ fromBase: 10, toBase: 16, value: String(ipInDecimal) }).toUpperCase(),
    },
    {
      label: t('tools.ipv4-address-converter.binary'),
      value: convertBase({ fromBase: 10, toBase: 2, value: String(ipInDecimal) }),
    },
    {
      label: 'Ipv6: ',
      value: ipv4ToIpv6({ ip: rawIpAddress.value }),
    },
    {
      label: t('tools.ipv4-address-converter.ipv6Short'),
      value: ipv4ToIpv6({ ip: rawIpAddress.value, prefix: '::ffff:' }),
    },
  ];
});

const { attrs: validationAttrs } = useValidation({
  source: rawIpAddress,
  rules: [{ message: t('tools.ipv4-address-converter.invalid'), validator: ip => isValidIpv4({ ip }) }],
});
</script>

<template>
  <div>
    <c-input-text v-model:value="rawIpAddress" :label="t('tools.ipv4-address-converter.inputLabel')" :placeholder="t('tools.ipv4-address-converter.inputPlaceholder')" />

    <n-divider />

    <input-copyable
      v-for="{ label, value } of convertedSections"
      :key="label"
      :label="label"
      label-position="left"
      label-width="100px"
      label-align="right"
      mb-2
      :value="validationAttrs.validationStatus === 'error' ? '' : value"
      :placeholder="t('tools.ipv4-address-converter.outputPlaceholder')"
    />
  </div>
</template>
