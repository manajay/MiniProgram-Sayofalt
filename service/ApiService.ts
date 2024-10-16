import { WXCloudServiceEnvID, WXServiceName ,GhostBaseUrl, GhostContentKey } from "./const";

export interface IBlog {
  id: string;
  title: string;
  published_at: string;
  feature_image: string;
  excerpt: string;
  url: string;
  html: string;
}

export interface IApiService {
   getLatestBlog():Promise<IBlog[]>;
}

class ApiService implements IApiService {
  constructor() {
  }
  getLatestBlog(): Promise<IBlog[]> {
    return new Promise((resolve, reject) => {
      const res = wx.cloud.callContainer({
        config: {
          env: WXCloudServiceEnvID,
        },
        path: '/api/blog/latest',
        method: 'GET',
        data: "",
        header: {
          'X-WX-SERVICE': WXServiceName,
          "content-type": "application/json"
        }
      });
      resolve(res);
    });
  }
}

class ApiWXService implements IApiService {
  constructor() {
  }
  getLatestBlog(): Promise<IBlog[]> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: GhostBaseUrl + '/posts/?key=' + GhostContentKey + '&fields=id,title,url,published_at,feature_image,html&limit=10&page=1',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          const data = res?.data as { posts };
          resolve(data?.posts);
        }
      })
    });
  }
}

let api = new ApiWXService();
export default api;