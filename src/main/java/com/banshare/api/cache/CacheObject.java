package com.banshare.api.cache;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.CacheLoader.InvalidCacheLoadException;
import com.google.common.cache.LoadingCache;

public class CacheObject {

	private static CacheObject instance = new CacheObject();
	private LoadingCache<String, List<Object>> cache;

	public static CacheObject getInstance() {
		return instance;
	}

	private CacheObject() {
		init();
	}

	private void init() {
		cache = CacheBuilder.newBuilder().expireAfterWrite(5, TimeUnit.HOURS)
				.build(new CacheLoader<String, List<Object>>() {
					@Override
					public List<Object> load(String key) {
						return null;
					}
				});
	}

	public void set(String key, List<Object> value) {
		synchronized (cache) {
			cache.put(key, value);
		}
	}

	public List<Object> get(String key) {
		try {
			return cache.get(key);
		} catch (ExecutionException e) {
			return null;
		} catch (InvalidCacheLoadException ie) {
			return null;
		}
	}
}
