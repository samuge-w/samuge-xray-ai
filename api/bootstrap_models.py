import os
import sys

def main():
    try:
        print("🔍 BOOTSTRAP: Starting model prefetch", file=sys.stderr)

        # Prefer caching inside the app dir so it persists within image layers
        os.environ.setdefault("HF_HOME", "/app/.cache/hf")
        os.environ.setdefault("TRANSFORMERS_CACHE", "/app/.cache/hf")
        os.environ.setdefault("TORCH_HOME", "/app/.cache/torch")
        os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")

        # Prefetch BiomedCLIP via Transformers as a robust default
        try:
            from transformers import AutoProcessor, AutoModel
            model_id = "microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224"
            print(f"🔍 BOOTSTRAP: Prefetching BiomedCLIP via Transformers: {model_id}", file=sys.stderr)
            _ = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)
            _ = AutoModel.from_pretrained(model_id, trust_remote_code=True)
            print("✅ BOOTSTRAP: BiomedCLIP prefetched", file=sys.stderr)
        except Exception as e:
            print(f"⚠️ BOOTSTRAP: Transformers prefetch failed: {e}", file=sys.stderr)

        print("✅ BOOTSTRAP: Done", file=sys.stderr)
    except Exception as e:
        print(f"❌ BOOTSTRAP: Unexpected error: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()


