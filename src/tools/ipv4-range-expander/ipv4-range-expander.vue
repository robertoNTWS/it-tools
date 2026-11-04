<script setup lang="ts">
import { Exchange } from '@vicons/tabler';
import { isValidIpv4 } from '../ipv4-address-converter/ipv4-address-converter.service';
import type { Ipv4RangeExpanderResult } from './ipv4-range-expander.types';
import { calculateCidr } from './ipv4-range-expander.service';
import ResultRow from './result-row.vue';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

// Não salva no navegador o texto digitado (LGPD); preferências continuam salvas
const rawStartAddress = ref('192.168.1.1');
const rawEndAddress = ref('192.168.6.255');

const result = computed(() => calculateCidr({ startIp: rawStartAddress.value, endIp: rawEndAddress.value }));

const calculatedValues: {
  id: string
  label: string
  getOldValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
  getNewValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined
}[] = [
  {
    id: 'start-address',
    label: t('tools.ipv4-range-expander.start'),
    getOldValue: () => rawStartAddress.value,
    getNewValue: result => result?.newStart,
  },
  {
    id: 'end-address',
    label: t('tools.ipv4-range-expander.end'),
    getOldValue: () => rawEndAddress.value,
    getNewValue: result => result?.newEnd,
  },
  {
    id: 'addresses-in-range',
    label: t('tools.ipv4-range-expander.addresses'),
    getOldValue: result => result?.oldSize?.toLocaleString(),
    getNewValue: result => result?.newSize?.toLocaleString(),
  },
  {
    id: 'cidr',
    label: 'CIDR',
    getOldValue: () => '',
    getNewValue: result => result?.newCidr,
  },
];

const startIpValidation = useValidation({
  source: rawStartAddress,
  rules: [{ message: t('tools.ipv4-range-expander.invalid'), validator: ip => isValidIpv4({ ip }) }],
});
const endIpValidation = useValidation({
  source: rawEndAddress,
  rules: [{ message: t('tools.ipv4-range-expander.invalid'), validator: ip => isValidIpv4({ ip }) }],
});

const showResult = computed(() => endIpValidation.isValid && startIpValidation.isValid && result.value !== undefined);

function onSwitchStartEndClicked() {
  const tmpStart = rawStartAddress.value;
  rawStartAddress.value = rawEndAddress.value;
  rawEndAddress.value = tmpStart;
}
</script>

<template>
  <div>
    <div mb-4 flex gap-4>
      <c-input-text
        v-model:value="rawStartAddress"
        :label="t('tools.ipv4-range-expander.start')"
        :placeholder="t('tools.ipv4-range-expander.startPlaceholder')"
        :validation="startIpValidation"
        clearable
      />

      <c-input-text
        v-model:value="rawEndAddress"
        :label="t('tools.ipv4-range-expander.end')"
        :placeholder="t('tools.ipv4-range-expander.endPlaceholder')"
        :validation="endIpValidation"
        clearable
      />
    </div>

    <n-table v-if="showResult" data-test-id="result">
      <thead>
        <tr>
          <th scope="col">
&nbsp;
          </th>
          <th scope="col">
            {{ t('tools.ipv4-range-expander.oldValue') }}
          </th>
          <th scope="col">
            {{ t('tools.ipv4-range-expander.newValue') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ResultRow
          v-for="{ id, label, getOldValue, getNewValue } in calculatedValues"
          :key="id"
          :test-id="id"
          :label="label"
          :old-value="getOldValue(result)"
          :new-value="getNewValue(result)"
        />
      </tbody>
    </n-table>
    <n-alert
      v-else-if="startIpValidation.isValid && endIpValidation.isValid"
      :title="t('tools.ipv4-range-expander.invalidCombination')"
      type="error"
    >
      <div my-3 op-70>
        {{ t('tools.ipv4-range-expander.invalidCombinationText') }}
      </div>

      <c-button @click="onSwitchStartEndClicked">
        <n-icon mr-2 :component="Exchange" depth="3" size="22" />
        {{ t('tools.ipv4-range-expander.switch') }}
      </c-button>
    </n-alert>
  </div>
</template>
