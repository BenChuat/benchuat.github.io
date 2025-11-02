import os
import chardet

ROOT = r"./"


def detect_bom(path):
    with open(path, "rb") as f:
        data = f.read(4)
    # UTF-8 BOM = EF BB BF
    return data.startswith(b"\xef\xbb\xbf")

def read_lines_utf8(path):
    # 尝试 UTF-8 读取
    with open(path, "rb") as f:
        raw = f.read()

    enc_guess = chardet.detect(raw).get("encoding", "utf-8")
    try:
        text = raw.decode(enc_guess, errors="replace")
    except:
        text = raw.decode("utf-8", errors="replace")

    return text.splitlines()

def check_front_matter(lines):
    problems = []
    ok = True

    if len(lines) == 0:
        return False, ["空文件？"]

    if lines[0].strip() != "+++":
        ok = False
        problems.append("未以 '+++' 开头 (TOML front matter 需要 '+++')")
        return ok, problems

    # 找第二个 +++
    end_idx = None
    for i in range(1, min(len(lines), 50)):
        if lines[i].strip() == "+++":
            end_idx = i
            break
    if end_idx is None:
        ok = False
        problems.append("未找到第二个 '+++' 作为 front matter 结束")
        return ok, problems

    meta = lines[1:end_idx]
    for ml in meta:
        stripped = ml.strip()
        if stripped == "":
            continue

        # YAML 风格 ":" 检测
        if ":" in stripped and "=" not in stripped.split(":")[0]:
            # 例如 translationKey: "hello"
            ok = False
            problems.append(f"使用了 ':' 而不是 '=' -> {stripped}")

        # 单引号检测
        if "=" in stripped and "'" in stripped:
            # 粗暴判断： title = 'Hello'
            left, right = stripped.split("=", 1)
            if right.strip().startswith("'") and right.strip().endswith("'"):
                ok = False
                problems.append(f"使用了单引号，请用双引号 -> {stripped}")

        # draft=true 提醒
        if stripped.startswith("draft") and "true" in stripped:
            problems.append("draft = true (草稿，正式发布请改 false)")

    return ok, problems

print("开始检查 Markdown 内容...\n")

for root, dirs, files in os.walk(ROOT):
    for fn in files:
        if fn.lower().endswith(".md"):
            p = os.path.join(root, fn)

            bom = detect_bom(p)
            lines = read_lines_utf8(p)
            ok, probs = check_front_matter(lines)

            print(f"文件: {p}")
            if bom:
                print("  [编码] UTF-8 with BOM ❌, 请另存为 UTF-8 无 BOM")
            else:
                print("  [编码] UTF-8 (看起来没 BOM) ✔")

            if ok:
                print("  [Front Matter] 结构看起来没问题 ✔")
            else:
                print("  [Front Matter] 存在问题 ❌")
                for pr in probs:
                    print(f"    - {pr}")
            print()

print("检查完成 ✅")
