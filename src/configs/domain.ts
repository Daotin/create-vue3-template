/**
 * 存放地址域名
 */

const nodeEnv = process.env.NODE_ENV || "development";

const isEnv = ["beta-", "dev-", "prod-", "test-"].some((v) => environment.includes(v));

const getBaseURL = () => {
  // 本地开发环境
  if (nodeEnv === "development") {
    return `${origin}/api`;
  }
  // 线上开发/测试环境
  if (isEnv) {
    return `${origin}/${environment}${target}`;
  }
  // 线上生产环境
  return target;
};

export const baseURL = getBaseURL();
