import KeyloggerService from "~/service/keylogger.service";
export default function (context, inject) {
  const $axios = context.$axios;
  const $config = context.$config;
  const provider = {
    $keylogger: new KeyloggerService($axios, $config),
  };

  inject("provider", provider);
  context.$provider = provider;
}
