import { WXCloudServiceEnvID, WXServiceName ,GhostBaseUrl, GhostContentKey } from "./const";

export interface IBlog {
  id: string;
  title: string;
  published_at: string;
  publishedTimeText?: string;
  feature_image: string;
  excerpt: string;
  url: string;
  html: string;
  reading_time: string; //建议阅读时间
}

export interface ITag {
  id: string;
  name: string;
  description: string;
  feature_image: string;
  slug: string;
  url: string;
  visibility: string; // public
}

export interface IApiService {
   getLatestBlog():Promise<IBlog[]>;
   getTags():Promise<ITag[]>;
}

class ApiService implements IApiService {
  constructor() {
  }
  getLatestBlog(): Promise<IBlog[]> {
    return new Promise((resolve, reject) => {
      // const res = wx.cloud.callContainer({
      //   config: {
      //     env: WXCloudServiceEnvID,
      //   },
      //   path: '/api/blog/latest',
      //   method: 'GET',
      //   data: "",
      //   header: {
      //     'X-WX-SERVICE': WXServiceName,
      //     "content-type": "application/json"
      //   }
      // });
      reject();
    });
  }

  getTags(): Promise<ITag[]> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}

class ApiWXService implements IApiService {
  constructor() {
  }
  getLatestBlog(): Promise<IBlog[]> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: GhostBaseUrl + '/posts/?key=' + GhostContentKey + '&fields=id,title,url,published_at,feature_image,html,excerpt,reading_time&limit=10&page=1',
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
  getTags(): Promise<ITag[]> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: GhostBaseUrl + '/tags/?key=' + GhostContentKey + '&order=name asc',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          const data = res?.data as { tags };
          resolve(data?.tags);
        }
      })
    });
  }
}

let api = new ApiWXService();
export default api;