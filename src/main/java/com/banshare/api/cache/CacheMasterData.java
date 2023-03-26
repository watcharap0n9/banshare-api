package com.banshare.api.cache;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.banshare.api.payload.response.MasterDataResponse;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.CacheLoader.InvalidCacheLoadException;
import com.google.common.cache.LoadingCache;

public class CacheMasterData {

	private static CacheMasterData instance = new CacheMasterData();
	private LoadingCache<String, MasterDataResponse> cache;

	public static CacheMasterData getInstance() {
		return instance;
	}

	private CacheMasterData() {
		init();
	}

	private void init() {
		cache = CacheBuilder.newBuilder().expireAfterWrite(5, TimeUnit.HOURS)
				.build(new CacheLoader<String, MasterDataResponse>() {
					@Override
					public MasterDataResponse load(String key) {
						return null;
					}
				});
	}

	public void set(String key, MasterDataResponse value) {
		synchronized (cache) {
			cache.put(key, value);
		}
	}

	public MasterDataResponse get(String key) {
		try {
			return cache.get(key);
		} catch (ExecutionException e) {
			return null;
		} catch (InvalidCacheLoadException ie) {
			return null;
		}
	}
}
