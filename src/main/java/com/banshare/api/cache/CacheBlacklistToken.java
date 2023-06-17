package com.banshare.api.cache;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.CacheLoader.InvalidCacheLoadException;
import com.google.common.cache.LoadingCache;

public class CacheBlacklistToken {

	private static CacheBlacklistToken instance = new CacheBlacklistToken();
	private LoadingCache<String, String> cache;

	public static CacheBlacklistToken getInstance() {
		return instance;
	}

	private CacheBlacklistToken() {
		init();
	}

	private void init() {
		cache = CacheBuilder.newBuilder().expireAfterWrite(12, TimeUnit.HOURS)
				.build(new CacheLoader<String, String>() {
					@Override
					public String load(String key) {
						return null;
					}
				});
	}

	public void set(String username, String token) {
		synchronized (cache) {
			cache.put(username, token);
		}
	}

	public String get(String username) {
		try {
			return cache.get(username);
		} catch (ExecutionException e) {
			return null;
		} catch (InvalidCacheLoadException ie) {
			return null;
		}
	}
}
