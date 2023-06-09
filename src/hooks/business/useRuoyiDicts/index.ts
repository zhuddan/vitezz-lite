import type { DictBaseOptions, LoadDict, OriginDictData, ResponseData } from '@zdzz/shared';

import { computed, toRefs, unref } from 'vue';
import { defHttp } from '@/utils/http';
import { Dict } from '@zdzz/shared';

export type DictTypes =
| 'sys_user_sex'
| 'sys_normal_disable'
| 'sys_job_group'
| 'sys_yes_no'
| 'sys_common_status'
| 'sys_common_status'
| 'sys_notice_type';

const getDicts: LoadDict<DictTypes> = (dictType) => {
  return new Promise<OriginDictData[]>((resolve, reject) => {
    defHttp
      .get<ResponseData<OriginDictData[]>>({
        url: `/api/sys/type/${dictType}`,
      }, {
        withToken: false,
        ignoreCancelToken: true,
      })
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`,
          );
        }
        else {
          resolve(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
  });
};

export function useDicts<DT extends DictTypes = DictTypes>(dts: DT[], options: Partial<DictBaseOptions> = {}) {
  const dict = new Dict<DT>(dts, getDicts, options);
  // debug
  Dict.debug = true;
  const format = dict.format.bind(dict);
  const load = dict.load.bind(dict);
  const dicts = computed (() => dict.data.value);
  const dictsLoading = computed (() => dict.loading.value);
  const useRuoyiDictsReturn = {
    format,
    load,
    dicts,
    dictsLoading,
    ...toRefs(unref(dict.data)),
    ...toRefs(unref(dict.loading)),
  };
  return useRuoyiDictsReturn;
}

