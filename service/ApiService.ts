import { genLspMeta } from "XrFrame/genLspMeta";
import { WXCloudServiceEnvID, WXServiceName ,GhostBaseUrl, GhostContentKey } from "./const";

export interface IMeta {
  pagination: IPagination
}

export interface IPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number;
  prev: number;
}

export interface IPageRes<T> {
  meta: IMeta;
  data: T;
}

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

export const FakeTagAll = {
  id: 'thisisafaketag-all',
  name: '全部',
  description: '',
  slug: '全部',
  url:'',
}


export interface IApiService {
   getLatestBlog(page?: number):Promise<IPageRes<IBlog[]>>;
   getTags():Promise<IPageRes<ITag[]>>;
}

class ApiService implements IApiService {
  constructor() {
  }
  getLatestBlog(page?: number): Promise<IPageRes<IBlog[]>> {
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

  getTags(): Promise<IPageRes<ITag[]>> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}

class ApiWXService implements IApiService {
  constructor() {
  }
  getLatestBlog(page?: number, tags?: string): Promise<IPageRes<IBlog[]>> {
    return new Promise((resolve, reject) => {
      let url = GhostBaseUrl + '/posts/?key=' + GhostContentKey
      url += '&fields=id,title,url,published_at,feature_image,html,excerpt,reading_time';
      url += '&limit=10&page=' + page ?? '1';
      if (!!tags && tags.length > 0) {
        url += '&filter=tag:' + tags;
      }
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res);
          const data = res?.data as { meta, posts}
          resolve({
            meta: data.meta,
            data: data.posts
          });
        },
        fail(err: { errMsg: string, errno: number}){
          reject(err)
          console.error(err);
        },
      })
    });
  }

  getTags(): Promise<IPageRes<ITag[]>> {
    return new Promise((resolve, reject) => {
      let url = GhostBaseUrl + '/tags/?key=' + GhostContentKey;
      url += '&order=name asc';
      url += '&include=count.posts';

      wx.request({
        url: url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          const data = res?.data as { meta, tags}
          // console.log(JSON.stringify(data.tags));
          resolve({
            meta: data.meta,
            data: data.tags
          });
        },
        fail(err) {
          reject(err);
          console.error(err);
        }
      })
    });
  }
}

let api = new ApiWXService();
export default api;